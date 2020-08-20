import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

const serviceAccount = require('./service_account_key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ng-login-601e3.firebaseio.com',
});

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((req, res) => {
  res.json('My first hello world from firebase!');
});

export const getGOTY = functions.https.onRequest(async (req, res) => {
  const gotyRef = db.collection('goty');
  const docsSnap = await gotyRef.get();

  const games = docsSnap.docs.map((doc) => doc.data());

  res.json(games);
});

// Express

const app = express();

app.use(cors({ origin: true }));

app.get('/goty', async (req: express.Request, res: express.Response) => {
  const gotyRef = db.collection('goty');
  const docsSnap = await gotyRef.get();

  const games = docsSnap.docs.map((doc) => doc.data());

  res.json(games);
});

app.post('/goty/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const gameRef = db.collection('goty').doc(id);
  const gameSnap = await gameRef.get();

  if (!gameSnap.exists) {
    res.status(404).json({
      ok: false,
      err: {
        message: 'No existe el juego',
        id,
      },
    });
  } else {
    const before = gameSnap.data() || { votes: 0 };
    await gameRef.update({
      votes: before.votes + 1,
    });
    res.json({
      ok: true,
      message: `Gracias por tu voto a ${before.name}`,
    });
  }
});

export const api = functions.https.onRequest(app);
