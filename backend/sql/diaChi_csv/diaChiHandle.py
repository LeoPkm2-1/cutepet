import pandas as pd
from pymongo import MongoClient

# MongoDB connection parameters
MONGO_HOST = "localhost"
MONGO_PORT = 27017
DB_NAME = "cutepet_nonsql"
COLLECTION_NAME = "DiaChi"

# CSV file path
# CSV_FILE_PATH = "./wards.csv"
CSV_FILE_LIST = [
    "./administrative_regions.csv",
    "./administrative_units.csv",
    "./provinces.csv",
    "./districts.csv",
    "./wards.csv",
]

for CSV_FILE_PATH in CSV_FILE_LIST:
    print(CSV_FILE_PATH)

    # Connect to MongoDB
    client = MongoClient(MONGO_HOST, MONGO_PORT)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

    # Read CSV file into a pandas DataFrame
    df = pd.read_csv(CSV_FILE_PATH)

    # Convert DataFrame to dictionary for insertion into MongoDB
    data = df.to_dict(orient="records")

    # Insert data into MongoDB
    collection.insert_many(data)

    # Close MongoDB connection
    client.close()

    print("CSV data inserted into MongoDB successfully.")
