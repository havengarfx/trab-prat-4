import express from 'express';
const router = express.Router();
import { promises as fs } from 'fs';
import { isNumber } from 'util';

const { readFile, writeFile } = fs;

router.get('/', async (req, res) => {
  const data = JSON.parse(await readFile('grades.json'));
  delete data.nextId;
  console.log(data);
  res.send(data);
});

router.post('/', async (req, res) => {
  let grade = req.body;
  let date = new Date();
  let dateString = date.toString();
  console.log(dateString);
  let data = JSON.parse(await readFile('grades.json'));
  grade = {
    id: data.nextId++,
    ...grade,
    timestamp: dateString,
  };
  console.log(grade);
  data.grades.push(grade);
  console.log(grade);
  await writeFile('grades.json', JSON.stringify(data));

  console.log(data);
  res.send(grade);
});

router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile('grades.json'));

    const grade = data.grades.find(
      (grade) => grade.id === parseInt(req.params.id)
    );

    console.log(grade);
    if (grade !== undefined) {
      res.send(grade);
    } else {
      res.send('Estudante não encontrado.');
    }

    // console.log(grade.id);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

  // console.log(data);
});

router.delete('/:id', async (req, res) => {
  const data = JSON.parse(await readFile('grades.json'));
  data.grades = data.grades.filter(
    (grade) => grade.id !== parseInt(req.params.id)
  );
  await writeFile('grades.json', JSON.stringify(data));

  console.log(data);
  res.end();
});

router.put('/', async (req, res) => {
  try {
    const grade = req.body;
    const data = JSON.parse(await readFile('grades.json'));

    const index = data.grades.findIndex((gr) => gr.id === grade.id);

    console.log(index);
    if (index === -1) {
      res.send('Estudante não encontrado.');
    } else {
      data.grades[index] = grade;
      console.log(grade);
      await writeFile('grades.json', JSON.stringify(data));

      console.log(data);
      res.send(grade);
    }

    // console.log(grade.id);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

  // console.log(data);
});

router.get('/totalgrade/:student/:subject', async (req, res) => {
  try {
    const data = JSON.parse(await readFile('grades.json'));

    const grade = data.grades.filter(
      (grade) =>
        grade.student === req.params.student &&
        grade.subject === req.params.subject
    );
    const sumAllValuesType = grade.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
    let result = sumAllValuesType.toString();
    console.log(result);
    if (grade !== undefined) {
      res.send(result);
    } else {
      res.send('Estudante não encontrado.');
    }

    // console.log(grade.id);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

  // console.log(data);
});

router.get('/mediagrades/:type/:subject', async (req, res) => {
  try {
    const data = JSON.parse(await readFile('grades.json'));

    const grade = data.grades.filter(
      (grade) =>
        grade.type === req.params.type && grade.subject === req.params.subject
    );
    const sumAllValuesType = grade.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
    let result = sumAllValuesType / grade.length;
    let resultString = result.toString();
    console.log(grade);
    if (grade.length !== 0) {
      res.send(resultString);
    } else {
      res.send('Subject e(ou) Type não encontrado.');
    }

    // console.log(grade.id);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

  // console.log(data);
});

router.get('/biggergrades/:type/:subject', async (req, res) => {
  try {
    const data = JSON.parse(await readFile('grades.json'));

    const grade = data.grades
      .filter(
        (grade) =>
          grade.type === req.params.type && grade.subject === req.params.subject
      )
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);

    console.log(grade);
    if (grade.length !== 0) {
      res.send(grade);
    } else {
      res.send('Subject e(ou) Type não encontrado.');
    }

    // console.log(grade.id);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

  // console.log(data);
});

export default router;
