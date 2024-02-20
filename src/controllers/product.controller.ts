import { Request, Response } from "express";
import ProductService from "../service/product.service";
import { Product } from "../typings/product.typings";
import axios from "axios";

const products: Array<string> = ["Rice", "Soap", "Shampoo", "Milk"];

export default {
  async createSortedList(req: Request, res: Response): Promise<Response> {
    try {
      const apiKey = process.env.OPENAI_API_KEY;
      const endpoint = "https://api.openai.com/v1/engines/text-davinci-003/completions";

      // const unsortedProducts = req.body;
      // console.log('------> unsortedProducts:', unsortedProducts);
      const unsortedProducts = products;
      console.log("------> unsortedProducts:", unsortedProducts);

      const prompt = `Given a list of products: ${products.join(", ")}, categorize them by sections.`;
      console.log("------> prompt:", prompt);

      // TODO: Transform into a Middleware
      // Process list (send and receive for OpenAI)
      try {
        const response = await axios.post(
          endpoint,
          {
            prompt,
            max_tokens: 64,
            temperature: 0.7,
            n: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          },
        );
        console.log("------> response:", response.data.choices);
        // const choices = [
        //     {
        //       text: '\n\nGrocery: Rice, Milk \n\nHygiene: Soap, Shampoo',
        //       index: 0,
        //       logprobs: null,
        //       finish_reason: 'stop'
        //     }
        // ]
        console.log("------> response:", response.data.choices[0].text);

        // Extrai a resposta da API
        const generatedText = response.data.choices[0].text;
        const sortedProducts = generatedText
          .trim()
          .split(",")
          .map((item: string) => item.trim());
        console.log("------> sortedProducts:", sortedProducts);

        if (!sortedProducts) return res.status(404).json({ error: "Erro ao classificar a lista" });

        return res.status(200).json(sortedProducts);

        // return res.send(req.body)
      } catch (err: any) {
        console.error("Erro ao fazer a requisição à API:", err);
        return res.status(err.code || 500).json({ error: err.message });
      }

      // --- RETURN
      // return res.json({ message: { unsortedProducts } });

      // --- DRAFT
      // Send the response to frontend
      //
      // if (!sortedList) return res.status(404).json({ error: `Erro ao classificar a lista` });
      // return res.status(200).json(sortedList);
    } catch (err: any) {
      console.error("Erro ao classificar produtos:", err.message);
      return res.status(err.code || 500).json({ error: err.message });
    }
  },

  async testPost(req: Request, res: Response): Promise<Response> {
    try {
      console.log(req.body);
      return res.status(200).json(">>>>>>> TEST POST <<<<<<<<");
    } catch (err: any) {
      console.error("Test error:", err.message);
      return res.status(err.code || 500).json({ error: err.message });
    }
  },
};
