update users 
set active = ${active}
where id = ${id}
returning *