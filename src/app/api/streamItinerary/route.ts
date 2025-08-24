import OpenAI from "openai";

// Initialize OpenAI client with error handling for missing API key
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("OPENAI_API_KEY environment variable is not set");
}

const openai = apiKey ? new OpenAI({ apiKey }) : null;

const DEVELOPER_PROMPT = `
You're an expert on solo traveling and will generate itineraries for users based on their preferences. 
Before doing so, you need to understand what the user is looking for.
The user will share a travel destination and you will use their preferences to generate the perfect itinerary.

The user will provide the following information:
age
currentLocation
interests
destination
travelPace
experience
transportation

Follow these guidelines:
- React markdown will be used to display the itinerary, ensure you adhere to that format.
- Do not do an introduction, directly go to the itinerary
- The itinerary will be a maximum of 5 days always
- The itinerary generated should be easy to digest and read. Feel free to use spacing, formatting and new-lines for that.
- change your tone of voice to be personalized to the user. Take into account their age, currentLocation and interests.
- if the residingCountry is does not exist, return an error message
- if the residingCity is does not exist, return an error message
- if the destination is does not exist, return an error message
`;

export async function POST(request: Request) {
  // Check if OpenAI client is initialized
  if (!openai) {
    return new Response(
      JSON.stringify({ 
        error: "OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable." 
      }), 
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  try {
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const { prompt } = await request.json();

          const openaiStream = await openai.chat.completions.create({
            model: "gpt-4o-2024-08-06",
            messages: [
              {
                role: "developer",
                content: DEVELOPER_PROMPT,
              },
              { role: "user", content: JSON.stringify(prompt) },
            ],
            stream: true,
          });

          for await (const chunk of openaiStream) {
            const delta = chunk.choices[0].delta;

            if (delta.content) {
              const data = JSON.stringify({
                event: "assistant_delta",
                data: delta,
              });
              controller.enqueue(`data: ${data}\n\n`);
            }
          }

          console.log("OpenAI stream finished");
          controller.close();
        } catch (error: unknown) {
          console.error("Error creating itinerary stream:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    console.error("Error in POST handler:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
}
