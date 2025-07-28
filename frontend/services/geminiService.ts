import { GoogleGenAI } from "@google/genai";
import { Customer, Product, Order } from '../types';

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("VITE_API_KEY environment variable not set in .env.local. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: apiKey! });

export const getBusinessInsights = async (data: { customers: Customer[]; products: Product[]; orders: Order[] }): Promise<string> => {
  if (!apiKey) {
    return "API Key is not configured. Please set the VITE_API_KEY environment variable in a .env.local file to use AI features.";
  }
  
  const model = "gemini-2.5-flash";

  const prompt = `
    You are a business intelligence analyst for Northwind Traders.
    Based on the following JSON data, provide three actionable business insights.
    The data includes customers, products, and recent orders.

    - Identify the best-selling product category.
    - Identify the country with the most orders.
    - Suggest a marketing campaign for a specific customer segment or product.

    Be concise and present the insights as a bulleted list.

    Data:
    Customers: ${JSON.stringify(data.customers.slice(0, 5))}
    Products: ${JSON.stringify(data.products.slice(0, 5))}
    Orders: ${JSON.stringify(data.orders.slice(0, 5))}
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while generating insights: ${error.message}`;
    }
    return "An unknown error occurred while generating insights.";
  }
};