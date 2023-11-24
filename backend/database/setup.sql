DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQURE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);
