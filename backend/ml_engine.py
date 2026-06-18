import pandas as pd
import pickle

# --- 1. THE COMPLETE ARCHITECTURE  ---
EXPECTED_COLUMNS = [
    'year', 'ai_adoption_level', 'ai_investment_usd', 'automation_rate', 
    'productivity_gain', 'employee_ai_training_hours', 'ai_maturity_score', 
    'deployment_count', 'industry_Education', 'industry_Energy', 
    'industry_Financial Services', 'industry_Healthcare', 'industry_Logistics', 
    'industry_Manufacturing', 'industry_Retail', 'industry_Technology', 
    'industry_Telecom', 'country_Brazil', 'country_Canada', 'country_China', 
    'country_France', 'country_Germany', 'country_India', 'country_Japan', 
    'country_Netherlands', 'country_Singapore', 'country_South Korea', 
    'country_Sweden', 'country_UAE', 'country_United Kingdom', 'country_United States'
]

# Wake up the trained XGBoost model
with open("champion_roi_model.pkl", "rb") as file:
    champion_model = pickle.load(file)

# --- 2. PREPROCESSING ---
def preprocess_user_data(user_payload):
    # Create the blank 31-column Scantron sheet
    input_df = pd.DataFrame(0, index=[0], columns=EXPECTED_COLUMNS)
    
    # Map all the raw numbers (We added the missing ones here!)
    input_df['year'] = user_payload['year']
    input_df['ai_adoption_level'] = user_payload['ai_adoption_level']
    input_df['ai_investment_usd'] = user_payload['ai_investment_usd']
    input_df['automation_rate'] = user_payload['automation_rate']
    input_df['productivity_gain'] = user_payload['productivity_gain']
    input_df['employee_ai_training_hours'] = user_payload['employee_ai_training_hours']
    input_df['ai_maturity_score'] = user_payload['ai_maturity_score']
    input_df['deployment_count'] = user_payload['deployment_count']
    
    # Handle the text-to-binary translation dynamically
    industry_col = f"industry_{user_payload['industry']}"
    if industry_col in input_df.columns:
        input_df[industry_col] = 1
        
    country_col = f"country_{user_payload['country']}"
    if country_col in input_df.columns:
        input_df[country_col] = 1
        
    return input_df


# --- 3. THE PREDICTION ENGINE ---
def calculate_roi(user_payload):
    # Step A: Translate the text
    processed_matrix = preprocess_user_data(user_payload)
    
    # Step B: Feed it to XGBoost
    predicted_benefit = champion_model.predict(processed_matrix)[0]
    
    # Step C: The Backend Math
    initial_investment = user_payload['ai_investment_usd']
    if initial_investment <= 0:
        roi_percentage = 0
    else:
        roi_percentage = (predicted_benefit / initial_investment) * 100
        
    # Step D: Package the final answer
    return {
        "predicted_financial_benefit_usd": round(float(predicted_benefit), 2),
        "roi_percentage": round(float(roi_percentage), 2)
    }
