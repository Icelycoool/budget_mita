from main import create_app
from config import ProdConfig


app = create_app(ProdConfig)
app.run(debug=True, port=5000)