# Special Topic in innovative integration of medicine and EECS (I) - Final Project: Medical Abbreviation Disambiguation

## Final project introduction
We The objective of this final project is to train a natural language processing model that can convert medical abbreviations into their full forms. This task is known as "Abbreviation Disambiguation (AD)" in the machine learning field. We used the [MeDAL](https://arxiv.org/abs/2012.13978) dataset for this purpose.

To improve the model's training time and accuracy, we implemented a triplet network with BioBERT and compared it with the ELECTRA model proposed in the original MeDAL dataset paper. We also developed a website with Flask as a backend and node.js as a frontend to demo our system. Our ultimate goal is to integrate this function into the system of a hospital in the future.

For detailed experiment results, observations, and model comparisons, please refer to the report.pdf. The report will describe the motivation behind choosing this topic, possible usage scenarios for this model, the dataset used for training, the model used for training, the experimental results, the design of the user interface, and directions for future improvements.

## Reproduce
Please refer to `./experiment/`

## Demo 
```
conda env create -f environment.yml
bash download_model.sh
python3 demo.py
```