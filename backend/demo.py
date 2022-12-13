from argparse import ArgumentParser, Namespace
from pathlib import Path

import numpy as np
import pandas as pd

import torch
from transformers import ElectraTokenizer

from models.tokenizer_and_dataset import HuggingfaceDataset
from models.electra import Electra

use_gpu = torch.cuda.is_available()
device = torch.device("cuda" if use_gpu else "cpu")

def parse_args() -> Namespace:
    parser = ArgumentParser()
    parser.add_argument(
        "--adam_path",
        type=Path,
        help="Directory to save the model file.",
        default="./cache/valid_adam.txt",
    )

    parser.add_argument("--model_ckpt", type=Path, default='./models/electra_pretrained.pt')

    args = parser.parse_args()
    return args

def has_numbers(inputString):
    return any(char.isdigit() for char in inputString)

def main(args):

    adam_df = pd.read_csv(args.adam_path, sep='\t')

    unique_labels = adam_df.EXPANSION.unique()
    label2idx = {label: ix for ix, label in enumerate(unique_labels)}
    idx2label = dict((v,k) for k,v in label2idx.items())

    model = Electra()

    ckpt = torch.load(args.model_ckpt)
    model.load_state_dict(ckpt)

    tokenizer = ElectraTokenizer.from_pretrained('google/electra-small-discriminator')
    
    model = model.to(device)
    model.eval()

    softmax = torch.nn.Softmax()

    input_text = ['This is a demo text AB']
    loc = 5
    word = input_text[0].split(' ')[loc]
    sents_idx = tokenizer.batch_encode_plus(
                input_text, max_length=512, 
                pad_to_max_length=True
                )['input_ids']
    ab_loc = torch.tensor([loc])
    logits = model(sents_idx, ab_loc)
    
    prob = softmax(logits)
    pred_5_value, pred_5_idx = torch.topk(prob, k=5, dim=1)
    pred_words, pred_probs = [], []
    pred_5_idx, pred_5_value =  pred_5_idx.cpu().detach().numpy()[0], pred_5_value.cpu().detach().numpy()[0]
    for pred_idx, pred_value in zip(pred_5_idx, pred_5_value):
        pred_words.append(idx2label[pred_idx])
        pred_probs.append(pred_value)

    print(f"Top 5 preidction of abbreviation: {word}")
    for i in range(len(pred_words)):
        print(pred_words[i], pred_probs[i]) 


    # for data_idx in test_dl:
    #     if data_idx.item() == 1:
    #         text = test['TEXT'][data_idx.item()]
    #         sents_idx, ab_locs, labels = test_data[data_idx]

    #         print("Text:", text)
    #         print("="*50)    

    #         text_split = text.split(" ")
    #         for i, word in enumerate(text_split):
    #             if word.isupper() and not has_numbers(word):
    #                 ab_locs = torch.from_numpy(
    #                     np.array([i])
    #                 )

    #                 print(ab_locs.size())
    #                 print(sents_idx)
    #                 logits = model(sents_idx, ab_locs)
                    
    #                 prob = softmax(logits)
    #                 pred_5_value, pred_5_idx = torch.topk(prob, k=5, dim=1)
    #                 pred_words, pred_probs = [], []
    #                 pred_5_idx, pred_5_value =  pred_5_idx.cpu().detach().numpy()[0], pred_5_value.cpu().detach().numpy()[0]
    #                 for pred_idx, pred_value in zip(pred_5_idx, pred_5_value):
    #                     pred_words.append(idx2label[pred_idx])
    #                     pred_probs.append(pred_value)

    #                 print(f"Top 5 preidction of abbreviation: {word}")
    #                 for i in range(len(pred_words)):
    #                     print(pred_words[i], pred_probs[i])

    #                 print("="*50)
            
    #                 return 
    

if __name__ == '__main__':
    args = parse_args()
    main(args)