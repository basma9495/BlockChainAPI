const fs = require('fs');
const path = require('path');
const Block = require('../models/block');


let blockchain = [];


const blockchainFilePath = path.join(__dirname, '..', 'data', 'blockchain.json');

try {
    const data = fs.readFileSync(blockchainFilePath, 'utf8');
    blockchain = JSON.parse(data);
} catch (error) {
   
    blockchain = [];
}


exports.createBlock = (req, res) => {
    const newIndex = blockchain.length;
    const newTimestamp = new Date().toISOString();
    const newData = req.body.data; 


    const newBlock = new Block(newIndex, newTimestamp, newData, blockchain[newIndex - 1].hash);
    newBlock.mineBlock(2); 
    blockchain.push(newBlock);

   
    fs.writeFileSync(blockchainFilePath, JSON.stringify(blockchain, null, 4));

    res.status(201).json({ message: 'Nytt block skapat!', block: newBlock });
};


exports.getAllBlocks = (req, res) => {
    res.status(200).json({ blocks: blockchain });
};


exports.getBlockById = (req, res) => {
    const blockId = req.params.blockId;

    if (blockId >= 0 && blockId < blockchain.length) {
        res.status(200).json({ block: blockchain[blockId] });
    } else {
        res.status(404).json({ message: 'Blocket hittades inte' });
    }
};
