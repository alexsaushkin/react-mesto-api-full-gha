const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const process = require('process');
const {
  ERROR_DEFAULT,
  MESSAGE_DEFAULT,
} = require('./utils/constants');
const cards = require('./routes/cards');
const users = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const {
  validateLogin,
  validateCreate,
} = require('./validation/userValidators');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DB_CONNECT = 'mongodb://127.0.0.1:27017/mestodb' } = require('./config');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
const app = express();

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});

mongoose.connect(DB_CONNECT, {
  useNewUrlParser: true,
});

const allowedCors = [
  'https://thirdyou.nomoredomains.rocks',
  'http://thirdyou.nomoredomains.rocks',
  'https://api.thirdyou.nomoredomains.rocks',
  'http://api.thirdyou.nomoredomains.rocks',
  'http://localhost:3000',
  'https://158.160.101.153',
  'http://158.160.101.153',
];

app.use(helmet());
app.use(express.json());
app.use(limiter);
app.use(requestLogger);

app.use(cors({
  origin: allowedCors,
  method: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreate, createUser);

app.use(auth);

app.use('/cards', cards);
app.use('/users', users);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT, message = MESSAGE_DEFAULT } = err;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
