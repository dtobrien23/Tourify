import joblib

# Load the models
models = {
    42: joblib.load('pickle_files/42.pkl'),
    43: joblib.load('pickle_files/43.pkl'),
    45: joblib.load('pickle_files/45.pkl'),
    88: joblib.load('pickle_files/88.pkl'),
    100: joblib.load('pickle_files/100.pkl'),
    142: joblib.load('pickle_files/142.pkl'),
    148: joblib.load('pickle_files/148.pkl'),
    158: joblib.load('pickle_files/158.pkl'),
    161: joblib.load('pickle_files/161.pkl'),
    162: joblib.load('pickle_files/162.pkl'),
    163: joblib.load('pickle_files/163.pkl'),
    164: joblib.load('pickle_files/164.pkl'),
    170: joblib.load('pickle_files/170.pkl'),
    230: joblib.load('pickle_files/230.pkl'),
    234: joblib.load('pickle_files/234.pkl'),
    236: joblib.load('pickle_files/236.pkl'),
    246: joblib.load('pickle_files/246.pkl'),
    249: joblib.load('pickle_files/249.pkl'),
    261: joblib.load('pickle_files/261.pkl')
}

main_model = joblib.load('pickle_files/main_model.pkl')