# To Do App in SEAN stack

This type of application is very common to tackle when learning a new language, which makes it extremely valuable to work through. Chances are good that at some point in your career you will tackle this again while learning another language.

[ ] Create a front end experience (e.g. a form) that allows a user to create a Task. 

[ ] When the Task is created, it should be stored inside of a database. 

[ ] Whenever a Task is created, the front end should refresh to show all tasks that need to be completed. 

[ ] Each Task should have an option to "Complete". 

[ ] Each Task should have an option to "Delete". 

[ ] When a Task is complete, its visual representation should change on the front end. (For example, the background of the task container could change from gray to green.) The complete option should be checked off. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete. 

[ ] Whether or not a Task is complete should also be stored in the database. 

[ ] Deleting a Task should remove it both from the front end as well as the database.

[ ] Make sure that you also show us your best styling chops.

[X] Include a database.sql file in your repo that includes CREATE TABLE queries.

[ ] Adjust logic so that completed tasks are brought to the bottom of the page, where the remaining tasks left to complete are brought to the top of the list.

[ ] In whatever fashion you would like, create an "are you sure: yes / no" option when deleting a task.

## Built With

PostgreSQL, Express, Angular, Node, JavaScript, Passport

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installing

Steps to get the development environment running.

```sql
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
```

## Screen Shot

Include one or two screen shots of your project here (optional).

### Completed Features

High level list of items completed.

- [ ] Feature a
- [ ] Feature b

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* [Sarah Cooke](https://github.com/marshcooke)

## Acknowledgments

* Passport initial set up thanks to Prime instructors.