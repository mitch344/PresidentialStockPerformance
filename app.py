from flask import Flask, render_template, request, jsonify
import yfinance as yf
import pandas as pd
from datetime import datetime

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_stock_data', methods=['GET'])
def get_stock_data():
    try:
        symbol = request.args.get('symbol', '^GSPC')
        start_date = request.args.get('start', '2021-01-20')
        end_date = request.args.get('end', '2025-01-20')

        try:
            datetime.strptime(start_date, '%Y-%m-%d')
            datetime.strptime(end_date, '%Y-%m-%d')
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400

        stock = yf.Ticker(symbol)
        hist = stock.history(start=start_date, end=end_date)

        if hist.empty:
            return jsonify({"error": "No data found for the specified period"}), 404

        data = {
            "dates": hist.index.strftime('%Y-%m-%d').tolist(),
            "prices": hist["Close"].tolist()
        }

        return jsonify(data)

    except Exception as e:
        app.logger.error(f"Error fetching stock data: {str(e)}")
        return jsonify({"error": "An error occurred while fetching stock data"}), 500

if __name__ == '__main__':
    app.run(debug=True)