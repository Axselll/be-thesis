# Title

actually this is my backend lol

## Endpoint

1 User

- don't even think about it i use GSign

2 Repository

- Get (All)

  - ${baseURL}/repository

- Get (Specific Repository)

  - ${baseURL}/repository/${user_id}/${repo_id}

- Post

  - ${baseURL}/repository/${user_id}

- Patch

  - ${baseURL}/repository/${user_id}/${repo_id}

- Delete
  - ${baseURL}/repository/${user_id}/${repo_id}

3 Commit

- Get (All)

  - ${baseURL}/commit

- Get (Specific Repository)

  - ${baseURL}/commit/${user_id}/${repo_id}/${commited_id}
  <!-- still broken dunno why -->

- Post

  - ${baseURL}/commit/${user_id}/${repo_id}

- Patch

  - ${baseURL}/commit/${user_id}/${repo_id}/${commited_id}

- Delete

  - ${baseURL}/commit/${user_id}/${repo_id}/${commited_id}

- Get (Download a file)
  - ${baseURL}/${file}
