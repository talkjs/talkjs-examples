from flask import Flask
import sqlite3
from flask import request
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

conn = sqlite3.connect('test.db')
conn.execute('''CREATE TABLE IF NOT EXISTS USERS
         (ID INT PRIMARY KEY NOT NULL,
         DP CHAR(100) NOT NULL,
         EMAIL CHAR(100) NOT NULL,
         NAME CHAR(50) NOT NULL,
         ROLE CHAR(20) NOT NULL);''')
print("Table created successfully");
conn.close()

@app.route('/getUser/', methods=['GET'])
def getUser():
    requestData = request.args
    id = requestData['id']
    conn = sqlite3.connect('test.db')
    cursor = conn.execute("SELECT * from USERS WHERE ID = ?", id)
    user = {
      'id': "",
      'name': "",
      'dp': "",
      'email': "",
      'role': ""
    }
    for row in cursor:
      user['id'] = row[0]
      user['dp'] = row[1]
      user['email'] = row[2]
      user['name'] = row[3]
      user['role'] = row[4]
    conn.close()
    response = jsonify(user)
    return response, 200

@app.route('/createUser/', methods=['POST'])
def createUser():
    conn = sqlite3.connect('test.db')
    requestData = request.json
    id = requestData['id']
    name = requestData['name']
    dp = requestData['dp']
    email = requestData['email']
    role = requestData['role']
    conn.execute("INSERT INTO USERS (ID,DP,EMAIL,NAME,ROLE) VALUES (?,?,?,?,?)",(id, dp, email, name, role));
    conn.commit()
    conn.close()
    return "User Created", 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)