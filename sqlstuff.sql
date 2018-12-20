CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username varchar(20) UNIQUE NOT NULL,
    password varchar(200)
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task varchar(30),
    complete boolean
);

CREATE TABLE users_tasks (
    users_id integer NOT NULL REFERENCES users,
    tasks_id integer NOT NULL REFERENCES tasks,
    PRIMARY KEY (users_id, tasks_id)
);
