update users 
set first = ${first}, last=${last}, email=${email}, username=${username}, pic=${pic}
where id = ${id}
returning *;