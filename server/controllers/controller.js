import Pair from '../models/schema.js';
import { nanoid } from 'nanoid';

const validatePairData = (data) => {
  if (!data.chainId || !data.dexId || !data.baseToken || !data.quoteToken) {
    throw new Error('Required fields are missing');
  }
};

export const sendPairs = async (req, res) => {
  try {
    validatePairData(req.body);
    const pairAddress = nanoid();
    const quoteTokenAddress = nanoid();
    const baseTokenAddress = nanoid();

    const newPair = new Pair({
      ...req.body,
      pairAddress,
      'baseToken.address': baseTokenAddress,
      'quoteToken.address': quoteTokenAddress,
    });

    await newPair.save();
    res.status(201).json({ message: 'Pair added successfully', pair: newPair });
  } catch (error) {
    console.error('Error adding pair:', error);
    res.status(500).json({ message: 'please Enter Number only' });
  }
};

export const getTokensList = async (req, res) => {
  try {
    const pairs = await Pair.find();
    res.status(200).json(pairs);
  } catch (error) {
    console.error('Error fetching token list:', error);
    res.status(500).json({ message: 'Failed to fetch token list', error: error.message });
  }
};




export const getPriceById = async (req, res) => {
  try {
    const { ID } = req.params;
    const pair = await Pair.findById(ID);
    if (!pair) {
      return res.status(404).json({ message: 'Pair not found' });
    }
    res.status(200).json(pair);
  } catch (error) {
    console.error('Error fetching pair by ID:', error);
    res.status(500).json({ message: 'Failed to fetch pair', error: error.message });
  }
};
