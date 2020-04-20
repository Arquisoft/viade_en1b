Feature: Logging in
    Scenario: The user is not already logged in
        Given We visit the "http://localhost:3000/viade_en1b"
        And We put our page "https://viandetest2020.solid.community/profile/card#me", we put the credentials username "ViandeTest2020" and password "uO257611__"
        Then The home page appears

    Scenario: The user is not already logged in
        Given We are logged in
        When We push the Upload Route button
        Then We can see the form to upload route
