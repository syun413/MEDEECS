# Special Topic in innovative integration of medicine and EECS (I) - Final Project: Medical Abbreviation Disambiguation

## Final project introduction
The objective of this final project is to train a natural language processing model that can convert medical abbreviations into their full forms, the task is called "Abbreviation Disambiguation (AD)" in machine learning filed. The data that we used is the [MeDAL](https://arxiv.org/abs/2012.13978) dataset. We implemented triplet network with BioBERT to improve the model's training time and accuracy, comparing to the ELECTRA model proposed in the original MeDAL dataset paper. We also set up a website with Flask as backend and node.js as frontend to demo our system and hope this function could be integrated into the system of a hospital in the future.

For detailed experiment results, obeservations and model comparisons, please refer to `report.pdf`. The report will describe the motivation for choosing this topic, possible usage scenarios for this model, the dataset used for training, the model used for training, the experimental results, the design of the user interface, and directions for future improvement.

## Reproduce
Please refer to `./experiment/`

## Demo 
```
conda env create -f environment.yml
bash download_model.sh
python3 demo.py
```