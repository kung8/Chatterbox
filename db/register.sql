INSERT INTO users (first,last,email,username,password)
VALUES (${first},${last},${email},${username},${password})
RETURNING id,first,last,email,username;