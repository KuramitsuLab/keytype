from flask import Flask, render_template, request
import modules

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# @app.route('/', methods=['POST'])
# def post():
#     try:
#         if request.form['text']:
#             input = request.form['text']
#             output = modules.api.query({
#                         "inputs": input,
#                     })
#             return render_template('index.html', output=output[0]['generated_text'])
#     except:
#         return render_template('index.html')

if __name__ == '__main__':

    app.debug = True
    app.run(host='localhost', port=8888)
