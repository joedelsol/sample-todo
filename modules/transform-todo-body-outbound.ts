import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

export default async function (
  response: Response,
  request: ZuploRequest,
  context: ZuploContext
) {
  // Get the outgoing body as an array of objects
  const jsonArray = await response.json();

  // Convert each object into an HTML string
  const htmlArray = jsonArray.map(item => `
    <br>
      User: ${item.userId} 
      ${item.completed ? "<strong>Completed</strong>" : "Didn't complete"} 
      ${item.title} 
    </br>
  `);

  // Join all HTML blocks into a single string
  const htmlBody = htmlArray.join("\n");

  // Return a new response with the modified HTML content
  return new Response(htmlBody, {
    headers: { "Content-Type": "text/html" }
  });
}