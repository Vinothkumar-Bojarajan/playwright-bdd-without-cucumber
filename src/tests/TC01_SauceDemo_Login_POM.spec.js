import { test, expect } from "@playwright/test";
import Login_po from '../pages/login_page.js';
import Login_Data_obj from '../data/login_data.json';

let page;
test('TC01_SauceDemo_Login_POM',
  { tag: ['@PI21-4', '@BCA', '@Z_Medium'] },
  async ({ page }) => {
    await NavigateToWebsite({page});
    await LoginWithValidCredentialsAndVerifyInventoryPage({page});
    await LoginWithInvalidCredentialsAndVerifyErrorMessage({page});

  });

async function NavigateToWebsite({page}) {
  console.log("Step 1: Navigating to Sauce Labs website");
  await page.goto(Login_Data_obj.SauceDemo_URL);
}
async function LoginWithValidCredentialsAndVerifyInventoryPage({page}) {
  console.log("Step 2: Logging in with valid credentials and verifying inventory page");
  const Login_po_obj = new Login_po(page);
  await Login_po_obj.login_enterUserID(Login_Data_obj.SauceDemo_Username);
  await Login_po_obj.login_enterPassword(Login_Data_obj.SauceDemo_Password);
  await Login_po_obj.login_clickLogin();
  await expect(page).toHaveURL(Login_Data_obj.SauceDemo_Redirect_URL);
}
async function LoginWithInvalidCredentialsAndVerifyErrorMessage({page}) {
  console.log("Step 3: Logging in with invalid credentials and verifying error message");
  const Login_po_obj = new Login_po(page);
  await page.goto(Login_Data_obj.SauceDemo_URL);
  //Scenario with wrong username and correct password
  await Login_po_obj.login_enterUserID(Login_Data_obj.SauceDemo_Wrong_Username);
  await Login_po_obj.login_enterPassword(Login_Data_obj.SauceDemo_Password);
  await Login_po_obj.login_clickLogin();
  expect(await Login_po_obj.login_getErrorMessage()).toContain(Login_Data_obj.SauceDemo_Error_Message);
  //Scenario with wrong password and correct username
  await Login_po_obj.login_enterUserID(Login_Data_obj.SauceDemo_Username);
  await Login_po_obj.login_enterPassword(Login_Data_obj.SauceDemo_Wrong_Password);
  await Login_po_obj.login_clickLogin();
  expect(await Login_po_obj.login_getErrorMessage()).toContain(Login_Data_obj.SauceDemo_Error_Message);
  //Scenario with empty username and password
  await Login_po_obj.login_enterUserID("");
  await Login_po_obj.login_enterPassword("");
  await Login_po_obj.login_clickLogin();
  expect(await Login_po_obj.login_getErrorMessage()).toContain(Login_Data_obj.SauceDemo_UserID_Required);
}