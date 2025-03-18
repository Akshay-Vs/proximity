# News Recommendation Algorithm

## Version: rec_v1.0.0

### Overview

This recommendation system suggests news articles based on a user's previously read news history. It leverages embeddings, similarity search, and a predictive model to enhance the user experience.

## Architecture

### Recommendation Pipeline

```mermaid
graph TD;
    subgraph Embedding Generation;
        A[User History] --> |Apply Prompt| C[Recommendation Model];
        C --> D[Generated Embedding];
    end

    subgraph Similarity Search;
        D --> E[Similarity Search];
        F[Vector Data] --> E;
        G[Vector Store] --> F;
    end

    E --> H[Top K Recommendations];
```

### User History

```mermaid
graph TD;
    A[History];
    A --> C[Headline and TLDR];
    A --> D[User Reading Time];
    A --> E[Liked or Disliked];
```

- **History** consists of a time series of the last `n` news articles read by the user.
  - In the code, `n` is referred to as `timeseries`, which is currently set to 5.
  - The model expects the last `n` articles read by the user as input.
- Data is accepted in JSON format (see [main.py](main.py)).

#### Example JSON Input

```json
[
	{
		"NewsTitle": "",
		"NewsTLDR": "",
		"Liked": ""
	},
	{
		"NewsTitle": "",
		"NewsTLDR": "",
		"Liked": ""
	},
	{
		"NewsTitle": "",
		"NewsTLDR": "",
		"Liked": ""
	},
	{
		"NewsTitle": "",
		"NewsTLDR": "",
		"Liked": ""
	},
	{
		"NewsTitle": "",
		"NewsTLDR": "",
		"Liked": ""
	}
]
```

## Recommendation Model

### Model Architecture

```mermaid
graph TD;
    subgraph Encoding;
        R[RoPE];
        A[News 1] --> F1[BERT] --> G1[Embedding] --> R;
        B[News 2] --> F2[BERT] --> G2[Embedding] --> R;
        C[News 3] --> F3[BERT] --> G3[Embedding] --> R;
        D[News 4] --> F4[BERT] --> G4[Embedding] --> R;
        E[News 5] --> F5[BERT] --> G5[Embedding] --> R;
    end

    subgraph Decoding;
        R --> L1[LSTM Embedding Generator] --> L2[LSTM Embedding Generator];
    end
    L2 --> H[Recommended Embedding];
```

### Functionality

- The `recommendationModel` predicts the embedding of the next news article a user is likely to read
- Using `FAISS`, finds the similar news with the generated news embedding.
- `FAISS` retrives top_k news similar to the generated embedding.
