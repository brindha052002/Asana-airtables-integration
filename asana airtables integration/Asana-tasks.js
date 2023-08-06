Required Libraries: requests, flask

import requests
from flask import Flask, request, jsonify

# Replace these with your actual API credentials
ASANA_ACCESS_TOKEN = 'ASANA_ACCESS_TOKEN'
AIRTABLE_API_KEY = 'AIRTABLE_API_KEY'
AIRTABLE_BASE_ID = 'AIRTABLE_BASE_ID'

app = Flask(_name_)

@app.route('/asana_webhook', methods=['POST'])
def asana_webhook_handler():
    data = request.get_json()
    if data.get('events'):
        for event in data['events']:
            if event.get('resource_type') == 'task' and event.get('action') == 'added':
                handle_new_task(event['resource'])
    return jsonify({'success': True})

def handle_new_task(task):
    task_id = task['gid']
    name = task['name']
    assignee = task.get('assignee', {}).get('name', 'Unassigned')
    due_date = task.get('due_on', 'No Due Date')
    description = task.get('notes', '')

    airtable_url = f'https://api.airtable.com/v0/{AIRTABLE_BASE_ID}/Asana%20Tasks'
    headers = {
        'Authorization': f'Bearer {AIRTABLE_API_KEY}',
        'Content-Type': 'application/json'
    }
    data = {
        'fields': {
            'Task ID': task_id,
            'Name': name,
            'Assignee': assignee,
            'Due Date': due_date,
            'Description': description
        }
    }
    response = requests.post(airtable_url, headers=headers, json=data)
    if response.status_code == 200:
        print('Task copied to Airtable successfully!')
    else:
        print('Failed to copy task to Airtable.')

if _name_ == '_main_':
    app.run(host='0.0.0.0', port=8080)