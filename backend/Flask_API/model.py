import pickle
import gzip

with gzip.open() as f:
    xgboostModel = pickle.load(f)

def predict(input):
    pred = xgboostModel.predict(input)[0]
    return pred