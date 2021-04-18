import 'package:flutter/material.dart';
import 'package:green_pedals/components/check_account_availability.dart';
import 'package:green_pedals/components/round_button.dart';
import 'package:green_pedals/components/round_input_field.dart';
import 'package:green_pedals/components/round_password_field.dart';
import 'package:green_pedals/constants.dart';
import 'package:green_pedals/screens/user_signin.dart';

class UserSignUp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return SingleChildScrollView(
      child: Scaffold(
        body: Container(
          width: double.infinity,
          height: size.height,
          child: SafeArea(
            child: Center(
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(top: 50, bottom: 20),
                    child: kGreenLogo,
                  ),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 20),
                    child: Text(
                      'SIGN UP',
                      style: kPageTitleTextStyle,
                    ),
                  ),
                  SizedBox(
                    height: size.height * 0.05,
                  ),
                  RoundedInputField(
                      hintText: 'Student ID',
                      icon: Icons.quick_contacts_mail_sharp,
                      onChanged: (value) {}),
                  RoundedInputField(
                      hintText: 'Name',
                      icon: Icons.account_circle,
                      onChanged: (value) {}),
                  RoundedInputField(
                      hintText: 'Email Address',
                      icon: Icons.mail,
                      onChanged: (value) {}),
                  RoundedPasswordField(
                    hintText: 'Password',
                    onChanged: (value) {},
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 20, bottom: 20),
                    child: RoundButton(
                      text: 'Sign Up',
                      height: 56.0,
                      width: size.width,
                      textColor: Colors.white,
                      backgroundColor: kPrimaryColor,
                      onPressed: () {
                        //setState(() {});
                      },
                    ),
                  ),
                  SizedBox(
                    height: size.height * 0.03,
                  ),
                  AlreadyHaveAnAccountCheck(
                    press: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) {
                            return UserSignIn();
                          },
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
