update users 
set active = 'active'
where username = ${username}
returning *