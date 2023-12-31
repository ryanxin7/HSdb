const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // 引入 cors 中间件

const app = express();
app.use(bodyParser.json());
app.use(cors()); // 使用 cors 中间件

// 创建数据库连接
const connection = mysql.createConnection({
  host: '192.168.149.30',
  user: 'root',
  password: '000000',
  database: 'hsdb'
});

// 连接数据库
connection.connect((err) => {
  if (err) {
    console.error('数据库连接失败：', err);
    return;
  }
  console.log('数据库已连接');
});

// 处理添加卡牌的 POST 请求
app.post('/add-card', (req, res) => {
  const { name, description, extension, cardClass, mana_cost, image_url, rarity, collection } = req.body;

  // TODO: Add input validation logic here

  const sql = 'INSERT INTO Cards (name, description, extension, cardClass, mana_cost, image_url, rarity, collection) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [name, description, extension, cardClass, mana_cost, image_url, rarity, collection], (err, results) => {
    if (err) {
      console.error('添加卡牌失败：', err);
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ error: '卡牌已存在' });
      } else {
        res.status(500).json({ error: '添加卡牌失败' });
      }
    } else {
      console.log('卡牌添加成功！');
      res.status(200).json({ message: '卡牌添加成功！' });
    }
  });
});

app.get('/getAllCards', (req, res) => {
  // 从数据库中获取卡牌数据的 SQL 查询
  const sql = 'SELECT * FROM Cards';

  // 执行 SQL 查询
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('获取卡牌失败：', err);
      res.status(500).json({ error: '获取卡牌失败' });
    } else {
      console.log('卡牌获取成功！');
      res.status(200).json({ cards: results });
    }
  });
});

app.get('/getTitansCards', (req, res) => {
  connection.query('SELECT * FROM Cards WHERE extension = "TITANS"', (err, results) => {
    if (err) {
      console.error('获取泰坦诸神扩展包卡牌失败：', err);
      res.status(500).json({ error: '获取泰坦诸神扩展包卡牌失败' });
    } else {
      res.status(200).json({ cards: results });
    }
  });
});

app.get('/getShowdownintheBadlandsCards', (req, res) => {
  connection.query('SELECT * FROM Cards WHERE extension = "ShowdownintheBadlands"', (err, results) => {
    if (err) {
      console.error('获取决战贫瘠之地扩展包卡牌失败：', err);
      res.status(500).json({ error: '获取决战贫瘠之地扩展包卡牌失败' });
    } else {
      res.status(200).json({ cards: results });
    }
  });
});

app.get('/AllClass', (req, res) => {
  connection.query('SELECT * FROM Cards WHERE extension = "ShowdownintheBadlands"', (err, results) => {
    if (err) {
      console.error('获取决战贫瘠之地扩展包卡牌失败：', err);
      res.status(500).json({ error: '获取决战贫瘠之地扩展包卡牌失败' });
    } else {
      res.status(200).json({ cards: results });
    }
  });
});


app.get('/mage', (req, res) => {
  connection.query('SELECT * FROM Cards WHERE cardClass = "mage"', (err, results) => {
    if (err) {
      console.error('获取法师职业卡牌失败：', err);
      res.status(500).json({ error: '获取法师职业卡牌失败' });
    } else {
      res.status(200).json({ cards: results });
    }
  });
});



app.get('/getFilteredCards', (req, res) => {
  const filterSetCards = req.query.filterSetCards;
  const filterClassCards = req.query.filterClassCards;
  const filterRarityCards = req.query.filterRarityCards;
  const filterManaCost = req.query.filterManaCost;
  const filterCollection = req.query.filterCollection;

  let query = 'SELECT * FROM Cards WHERE 1 = 1';

  if (filterSetCards !== 'getAllSetCards') {
    query += ` AND extension = "${filterSetCards}"`;
  }

  if (filterClassCards !== 'AllClass') {
    query += ` AND cardClass = "${filterClassCards}"`;
  }

  if (filterRarityCards !== 'AllRarity') {
    query += ` AND rarity = "${filterRarityCards}"`;
  }

  if (filterManaCost !== 'AllManaCost') {
    query += ` AND mana_cost = ${filterManaCost}`;
  }
  if (filterCollection !== 'allcollection') {
    query += ` AND collection = "${filterCollection}"`;
  }

  connection.query(query, (err, results) => {
    if (err) {
      console.error('获取筛选卡牌失败：', err);
      res.status(500).json({ error: '获取筛选卡牌失败' });
    } else {
      res.status(200).json({ cards: results });
    }
  });
});







// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`服务器已启动，端口号：${PORT}`);
});
