update users 
set active = 'active'
where username ilike ${username}
returning *