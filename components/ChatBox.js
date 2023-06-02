import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineSend } from "react-icons/ai";
import Reply from "./Reply";
import Image from "next/image";

const ChatBox = () => {
  const messagesRef = useRef();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  console.log(messages);
  // send message to API /api/chat endpoint
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;

    setLoading(true);

    const newMessages = [...messages, { role: "user", content: message }];

    setMessage("");

    setMessages(newMessages);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: newMessages.slice(-10),
        prompt: "You are my personal assistant help me with my work",
      }),
    });

    // console.log(response, "response from the sendMessage function");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    if (!response.body) return;

    const reader = response.body.getReader();
    // console.log(reader, "reader from the sendMessage function");
    const decoder = new TextDecoder();
    // console.log(decoder, "decoder from the sendMessage function");
    let done = false;

    let lastMessage = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      lastMessage = lastMessage + chunkValue;

      setMessages([
        ...newMessages,
        { role: "assistant", content: lastMessage },
      ]);

      messagesRef.current?.scrollIntoView({ block: "end" });

      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-[80vh] bg-s-bg shadow-sm sm:h-[90vh] sm:w-3/4 p-4 rounded-2xl  mt-12  ">
      <div className="h-full flex flex-col  p-4 rounded-2xl">
        {/* <!--  Message header section starts    --> */}
        <div className="msg-header flex gap-8 items-center">
          {/* <div className="h-12 w-12 justify-center items-center rounded-full bg-[#DDD6FF] border-2 border-[#B2A4FF]">
            <Image
              alt={celebData.name}
              width={48}
              height={48}
              className=" rounded-full object-center object-cover w-12 h-12"
              src={celebData.image}
            />
          </div> */}
        </div>
        {/* {/* <!-- Message header section ends --> */}
        {/* <!-- Chat inbox section starts --> */}
        <div className="grow md:h-[52vh] overflow-auto">
          <div className="h-full">
            <div className="h-full overflow-auto custom-scrollbar" id="style-1">
              <div className="mt-6 transition-all">
                {/* <!-- Contains the incoming and outgoing messages --> */}
                <div ref={messagesRef} className="">
                  <motion.div
                    animate={{
                      opacity: [0, 1],
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2,
                    }}
                    className="scale-95 mr-16"
                  ></motion.div>

                  {messages.map((message, index) => (
                    <Reply
                      key={index}
                      message={message.content}
                      role={message.role}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* <!--  Message bottom section starts --> */}
          </div>
        </div>
        <div className="msg-bottom mt-2">
          <div className="msg-input flex gap-2 items-center">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(e);
                }
              }}
              className=" border-2 border-black focus:border-blue-500 placeholder:text-black/30 rounded-3xl p-3 w-full text-base focus:outline-none"
              placeholder="Type a message"
            />
            <button
              onClick={(e) => sendMessage(e)}
              className=" text-base text-black rounded-full p-3 focus:outline-none"
            >
              <AiOutlineSend className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
