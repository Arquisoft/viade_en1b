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
var originalWindow = null;



//-------------------------------------------SECOND FEATURE --------------------------------------------------//

Given('We log in', function () {
  driver.get("http://localhost:3000/viade_en1b");
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
    var input = driver.findElement(By.xpath("/html/body/div/div/form/input"));
    input.sendKeys("https://viandetest2020.solid.community/profile/card#me");
    driver.findElement(By.xpath("/html/body/div/div/form/button")).click();
    driver.wait(until.elementsLocated(By.xpath("/html/body/div/div[2]/div[1]/div[1]/div/form/div[1]/div/input")), 10000).then(
      function () {
        driver.findElement(By.xpath("/html/body/div/div[2]/div[1]/div[1]/div/form/div[1]/div/input")).sendKeys("ViandeTest2020");
        driver.findElement(By.xpath("/html/body/div/div[2]/div[1]/div[1]/div/form/div[2]/div/input")).sendKeys("uO257611__");
        var loginButton = driver.findElement(By.xpath("/html/body/div/div[2]/div[1]/div[1]/div/form/button"));
        loginButton.click();
      })
  })
});

When('We push the My routes button', function () {
  driver.wait(function () {
    return driver.getAllWindowHandles().then(function (handles) {
      var isHandleCount2 = (handles.length == 2);
      originalWindow = handles[0];
      if (isHandleCount2) {
        driver.switchTo().window(handles[1]);
      }
      return isHandleCount2;
    });
  }).then(function () {
    driver.wait(function () {
      return driver.getAllWindowHandles().then(function (handles) {
        var isHandleCount1 = (handles.length == 1);
        originalWindow = handles[0];
        if (isHandleCount1) {
          driver.switchTo().window(handles[0]);
          //here we do the things
          driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/nav/div/div/span[2]/a")), 10000).then(
            function () {
              var buttonUpload = driver.findElement(By.xpath("/html/body/div/div/nav/div/div/span[2]/a"));
              buttonUpload.click();
            }
          )
        }
        return isHandleCount1;
      });
    })
  });
});


Then('We can see the routes', function () {
  driver.wait(function () {
    return driver.getAllWindowHandles().then(function (handles) {
      var isHandleCount2 = (handles.length == 2);
      originalWindow = handles[0];
      if (isHandleCount2) {
        driver.switchTo().window(handles[1]);
      }
      return isHandleCount2;
    });
  }).then(function () {
    driver.wait(function () {
      return driver.getAllWindowHandles().then(function (handles) {
        var isHandleCount1 = (handles.length == 1);
        originalWindow = handles[0];
        if (isHandleCount1) {
          driver.switchTo().window(handles[0]);
          //here we do the things
          driver.wait(until.elementsLocated(By.xpath("/html/body/div/div/div[1]/div[1]/span")), 10000).then(
            function () {
              var routeList = driver.findElement(By.xpath("/html/body/div/div/div[1]/div[1]/span"));
              expect(routeList!=null);
            }
          )
        }
        return isHandleCount1;
      });
    })
  });
});




