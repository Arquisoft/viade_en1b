const { Given, When, Then } = require("cucumber");
const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');
const { firefox } = require("selenium-webdriver/firefox");
var webdriver = require("selenium-webdriver");
require("chromedriver");
path = "C:\Users\alvar\geckodriver-v0.26.0-win64.exe";
const capabilities = Capabilities.chrome();
var chromeOptions = {
  'args': ['--test-type', '--start-maximized']
}
capabilities.set('chromeOptions', chromeOptions);
const driver = new webdriver.Builder().forBrowser('chrome').build();
var title = null;

//FIRST FEATURE
Given('We visit the {string}', function (string) {
  driver.get(string);
  var button = driver.findElement(By.xpath("//*[contains(text(), 'Login here!')]"));
  expect(button != null);
});

Given('We put our page {string}, we put the credentials username {string} and password {string}', function (string, string2, string3) {
  driver.findElement(By.xpath("/html/body/div/div/div[1]/div[3]/button")).click();
  driver.wait(function () {
    return driver.getAllWindowHandles().then(function (handles) {
      var isHandleCount2 = (handles.length == 2);
      if (isHandleCount2) {
        driver.switchTo().window(handles[1]);
      }
      return isHandleCount2;
    });
  }).then(function () {
    //new tab
    var input = driver.findElement(By.xpath("/html/body/div/div/form/input"));
    input.sendKeys(string);
    driver.findElement(By.xpath("/html/body/div/div/form/button")).click();
    driver.wait(until.elementsLocated(By.xpath("/html/body/div/div[2]/div[1]/div[1]/div/form/div[1]/div/input")), 10000).then(
      function () {
        //we access the second barrier, the username and password
        driver.findElement(By.xpath("/html/body/div/div[2]/div[1]/div[1]/div/form/div[1]/div/input")).sendKeys(string2);
        driver.findElement(By.xpath("/html/body/div/div[2]/div[1]/div[1]/div/form/div[2]/div/input")).sendKeys(string3);
        //we push the button
        var loginButton = driver.findElement(By.xpath("/html/body/div/div[2]/div[1]/div[1]/div/form/button"));
        //console.log(loginButton);
        loginButton.click();
      }
    );

  })
});

Then('The home page appears', function () {
  driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/div[1]/div[1]/h1")), 10000).then(
    function () {
      var elementHeader = driver.findElement(By.xpath("/html/body/div/div/div[1]/div[1]/h1"));
      expect(elementHeader != null);
    }
  );
});

//-------------------------------------------SECOND FEATURE --------------------------------------------------//

Given('We are logged in', function () {
  driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/div[1]/div[1]/h1")), 10000).then(
    function () {
      var elementHeader = driver.findElement(By.xpath("/html/body/div/div/div[1]/div[1]/h1"));
      expect(elementHeader != null);
    }
  );
});

When('We push the Upload Route button', function () {
  
  /*driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/nav/button/span")), 10000).then(
    function () {
      driver.findElement(By.xpath("/html/body/div/div/nav/div/div/span[2]/a")).click();
      driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/nav/div/div/span[2]/a")), 10000).then(
        function () {
          var upload = driver.findElement(By.xpath("/html/body/div/div/nav/div/div/span[2]/a"));
          upload.click();
        });
     
    }
  );
  */
});





/*


Then('The dashboard page shows a route list and a map', function () {
  driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/div[1]/div[1]/h1")), 10000).then(
    function () {
      var elementHeader = driver.findElement(By.xpath("/html/body/div/div/div[1]/div[1]/h1"));
      expect(elementHeader != null);
    }
  );
});

When('We push the Upload Route button', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('We can see the form to upload route', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});



//THIRD SCENARIO
When('We push the My Routes button', function () {
  // Write code here that turns the phrase above into concrete actions
  //return 'pending';
});

Then('The MyRoutes page appears', function () {
  // Write code here that turns the phrase above into concrete actions
  //return 'pending';
});

Then('We can see and select our Routes', function () {
  // Write code here that turns the phrase above into concrete actions
  //return 'pending';
});

//  FOURTH SCENARIO

When('We push the person icon', function () {
  // Write code here that turns the phrase above into concrete actions
  // return 'pending';
});

When('We push the My profile section', function () {
  // Write code here that turns the phrase above into concrete actions
  //return 'pending';
});

Then('Our profile appears showing us our information', function () {
  // Write code here that turns the phrase above into concrete actions
  //return 'pending';
});

// FIFTH SCENARIO



When('We push the logout section', function () {
  // Write code here that turns the phrase above into concrete actions
  //return 'pending';
});

Then('We get to the initial page of registration', function () {
  // Write code here that turns the phrase above into concrete actions
  //return 'pending';
});


*/