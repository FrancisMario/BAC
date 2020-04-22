Login
-----
When the user provides his/her business ID and password, JWT is going to generate a token with the signed-in user info. This token is signed and can be recognised by the server, any tampering will render it invalid. 

The token is then sent to the browser. Any request that is going to be made by the user that requires authorization will have to be sent with the token.

The token can be stored securely in the browser once received, but this is done in the frontend. Meaning the code here is not responsible for that. You will have to store it with client-side JavaScript.

Every successful login generates two tokens, an access token which expires after a certain period and a refresh token with no expiration that is used to generate a new access token. This refresh token is stored in the database so that the user would not have to manually login again. This is necessary because once the access token expires, the user will have to login again. But without having to provide business ID and password, they will be asked to click a link that makes a request with the refresh token to be signed in and get a new access token. The refresh token does not expire.

For logging out completely, after the user clicks the logout button/link, his access token will expire and his refresh token will be permanently deleted from the database so that he will have to provide business ID and password to login again.

You can find more information about how jsonwebtoken works when you read their documentation online.