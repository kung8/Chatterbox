INSERT INTO users (first,last,email,username,password,pic,active)
VALUES (${first},${last},${email},${username},${password},${pic},${active})
RETURNING id,first,last,email,username,pic,active;