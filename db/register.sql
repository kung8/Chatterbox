INSERT INTO users (first,last,email,username,password,pic)
VALUES (${first},${last},${email},${username},${password},${pic})
RETURNING id,first,last,email,username,pic;