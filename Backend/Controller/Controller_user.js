const usercol = require("../Models/User_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");

// function to create token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      emailid: user.emailid,
      userType: user.userType
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    }
  );
};

// SIGNUP
let signup = (req, res) => {
  console.log("Incoming Data:", req.body);

  usercol.usermodel.findOne({ emailid: req.body.emailid })
    .then((existingUser) => {
      if (existingUser) {
        return res.json({ status: false, msg: "User already exists" });
      }

      bcrypt.hash(req.body.pwd, 10)
        .then((hashedPwd) => {
          req.body.pwd = hashedPwd;

          let objUserColRef = new usercol.usermodel(req.body);

          objUserColRef.save()
            .then(async (doc) => {

              // ✅ Professional HTML Email
              const welcomeHtml = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                  <title>Welcome to StitchFind</title>
                </head>
                <body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, sans-serif;">

                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding: 40px 0;">
                    <tr>
                      <td align="center">

                        <!-- Card -->
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

                          <!-- Header -->
                          <tr>
                            <td style="background-color:#4f46e5; padding: 32px 40px; text-align:center;">
                              <h1 style="color:#ffffff; margin:0; font-size:28px; letter-spacing:1px;">✂️ StitchFind</h1>
                              <p style="color:#c7d2fe; margin: 8px 0 0; font-size:14px;">Your Tailoring Partner</p>
                            </td>
                          </tr>

                          <!-- Body -->
                          <tr>
                            <td style="padding: 40px;">
                              <h2 style="color:#1e1b4b; margin-top:0;">Welcome, ${doc.name}! 🎉</h2>
                              <p style="color:#4b5563; font-size:15px; line-height:1.7;">
                                We're thrilled to have you on board. Your account has been created successfully.
                                You can now explore tailors, place orders, and manage everything from your dashboard.
                              </p>

                              <!-- Info Box -->
                              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4ff; border-left: 4px solid #4f46e5; border-radius:6px; margin: 24px 0;">
                                <tr>
                                  <td style="padding: 16px 20px;">
                                    <p style="margin:0; color:#374151; font-size:14px;"><strong>📧 Email:</strong> ${doc.emailid}</p>
                                    <p style="margin:8px 0 0; color:#374151; font-size:14px;"><strong>📱 Phone:</strong> ${doc.phone || "Not provided"}</p>
                                    <p style="margin:8px 0 0; color:#374151; font-size:14px;"><strong>👤 Account Type:</strong> ${doc.userType}</p>
                                  </td>
                                </tr>
                              </table>

                              <!-- CTA Button -->
                              <table cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                                <tr>
                                  <td style="background-color:#4f46e5; border-radius:6px;">
                                    <a href="https://yourapp.com/dashboard"
                                      style="display:inline-block; padding: 14px 32px; color:#ffffff; text-decoration:none; font-size:15px; font-weight:bold;">
                                      Go to Dashboard →
                                    </a>
                                  </td>
                                </tr>
                              </table>

                              <p style="color:#6b7280; font-size:14px; line-height:1.6;">
                                If you didn't sign up for StitchFind, you can safely ignore this email.
                              </p>
                            </td>
                          </tr>

                          <!-- Footer -->
                          <tr>
                            <td style="background-color:#f9fafb; padding: 24px 40px; text-align:center; border-top: 1px solid #e5e7eb;">
                              <p style="margin:0; color:#9ca3af; font-size:13px;">© 2025 StitchFind. All rights reserved.</p>
                              <p style="margin:6px 0 0; color:#9ca3af; font-size:13px;">
                                Need help? <a href="mailto:support@stitchfind.com" style="color:#4f46e5; text-decoration:none;">support@stitchfind.com</a>
                              </p>
                            </td>
                          </tr>

                        </table>
                        <!-- End Card -->

                      </td>
                    </tr>
                  </table>

                </body>
                </html>
              `;

              await sendMail(
                doc.emailid,
                "Welcome to StitchFind 🎉",
                welcomeHtml  // ✅ Passing HTML instead of plain text
              );

              const token = generateToken(doc);

              res.json({
                status: true,
                msg: "Signup successful",
                token: token,
                user: {
                  id: doc._id,
                  emailid: doc.emailid,
                  userType: doc.userType,
                  name: doc.name,
                  phone: doc.phone
                }
              });
            })
            .catch((err) => res.json({ status: false, msg: err.message }));
        })
        .catch((err) => res.json({ status: false, msg: err.message }));
    })
    .catch((err) => res.json({ status: false, msg: err.message }));
};

// LOGIN
let login = (req, res) => {
  usercol.usermodel.findOne({ emailid: req.body.emailid })
    .then((user) => {
      if (!user) {
        return res.json({ status: false, msg: "User not found" });
      }

      bcrypt.compare(req.body.pwd, user.pwd)
        .then((match) => {
          if (!match) {
            return res.json({ status: false, msg: "Wrong password" });
          }

          const token = generateToken(user);

          res.json({
            status: true,
            msg: "Login successful",
            token: token,
            user: {
              id: user._id,
              emailid: user.emailid,
              userType: user.userType,
              name: user.name,
              phone: user.phone
            }
          });
        })
        .catch((err) => {
          res.json({ status: false, msg: err.message });
        });
    })
    .catch((err) => {
      res.json({ status: false, msg: err.message });
    });
};

module.exports = { signup, login };