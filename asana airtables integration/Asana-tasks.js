const fetch = require('node-fetch');

// Asana API Configuration
const asanaToken = '1205215970437310';
const asanaProjectId = '1205220311871248';

// Airtable API Configuration
const airtableApiKey = 'patlnDu5o6bCh8E86.d63b670e013cea331c83895a9d9784c8371d04a9ce7f099e8e499e769d1631d4';
const airtableBaseId = 'appZQVspiSsQyucU0';
const airtableTable = 'Asana and airtables intergration';

async function createAirtableTask(taskData) {
  const url = `https://api.airtable.com/v0/${appZQVspiSsQyucU0}/${Asana_and _airtables _intergration}`;
  const headers = {
    Authorization: `Bearer ${airtableApiKey}`,
    'Content-Type': 'application/json',
  };

  const requestBody = {
    records: [
      {
        fields: {
          'Task ID': taskData.task_id,
          'Name': taskData.name,
          'Assignee': taskData.assignee,
          'Due Date': taskData.due_date,
          'Description': taskData.description,
        },
      },
    ],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody),
  });

  if (response.ok) {
    const responseBody = await response.json();
    console.log('Task copied to Airtable:', responseBody.records[0].id);
  } else {
    console.error('Error copying task to Airtable:', response.statusText);
  }
}

async function fetchNewAsanaTasks() {
  const url = `https://app.asana.com/api/1.0/projects/${1205220311871248}/tasks`;
  const headers = {
    Authorization: `Bearer ${1205215970437310}`,
  };

  const response = await fetch(url, {
    headers: headers,
  });

  if (response.ok) {
    const responseBody = await response.json();
    const tasks = responseBody.data;

    tasks.forEach((task) => {
      const taskData = {
        task_id: task.gid,
        name: task.name,
        assignee: task.assignee.name,
        due_date: task.due_on,
        description: task.notes,
      };

      createAirtableTask(taskData);
    });
  } else {
    console.error('Error fetching tasks from Asana:', response.statusText);
  }
}

// Trigger the integration
fetchNewAsanaTasks();
