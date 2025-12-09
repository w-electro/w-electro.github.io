"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Copy, Sparkles, RefreshCw, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

interface MessageBubbleProps {
  message: Message;
  onRegenerate?: () => void;
}

export function MessageBubble({ message, onRegenerate }: MessageBubbleProps) {
  const [copied, setCopied] = React.useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          isUser
            ? "bg-gray-200"
            : "bg-gradient-to-br from-cyan-500 to-orange-500"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-gray-600" />
        ) : (
          <Sparkles className="h-4 w-4 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn("flex-1 max-w-[85%]", isUser && "flex justify-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3",
            isUser
              ? "bg-primary text-primary-foreground rounded-bl-none"
              : "bg-gray-100 rounded-br-none"
          )}
        >
          {/* Image if present */}
          {message.imageUrl && (
            <div className="mb-3">
              <img
                src={message.imageUrl}
                alt="Uploaded"
                className="max-w-full rounded-lg"
              />
            </div>
          )}

          {/* Message Text */}
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-strong:text-gray-900 prose-code:text-primary prose-code:bg-white/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const isInline = !match;

                    if (isInline) {
                      return (
                        <code
                          className="bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }

                    return (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-xl !bg-gray-900 !my-4"
                        customStyle={{
                          direction: "ltr",
                          textAlign: "left",
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    );
                  },
                  // Custom blockquote styling
                  blockquote({ children }) {
                    return (
                      <blockquote className="border-r-4 border-primary pr-4 my-4 text-gray-600 italic">
                        {children}
                      </blockquote>
                    );
                  },
                  // Custom list styling
                  ul({ children }) {
                    return (
                      <ul className="list-disc list-inside space-y-1 my-3">
                        {children}
                      </ul>
                    );
                  },
                  ol({ children }) {
                    return (
                      <ol className="list-decimal list-inside space-y-1 my-3">
                        {children}
                      </ol>
                    );
                  },
                  // Custom heading styling
                  h1({ children }) {
                    return (
                      <h1 className="text-xl font-bold text-gray-900 mt-4 mb-2">
                        {children}
                      </h1>
                    );
                  },
                  h2({ children }) {
                    return (
                      <h2 className="text-lg font-bold text-gray-900 mt-4 mb-2">
                        {children}
                      </h2>
                    );
                  },
                  h3({ children }) {
                    return (
                      <h3 className="text-base font-bold text-gray-900 mt-3 mb-1">
                        {children}
                      </h3>
                    );
                  },
                  // Custom table styling
                  table({ children }) {
                    return (
                      <div className="overflow-x-auto my-4">
                        <table className="min-w-full border border-gray-200 rounded-lg">
                          {children}
                        </table>
                      </div>
                    );
                  },
                  th({ children }) {
                    return (
                      <th className="bg-gray-100 px-4 py-2 text-right font-semibold border-b">
                        {children}
                      </th>
                    );
                  },
                  td({ children }) {
                    return (
                      <td className="px-4 py-2 border-b border-gray-100">
                        {children}
                      </td>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Actions */}
        {!isUser && (
          <div className="flex items-center gap-1 mt-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-gray-400 hover:text-gray-600"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 ml-1" />
                  <span className="text-xs">تم النسخ</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 ml-1" />
                  <span className="text-xs">نسخ</span>
                </>
              )}
            </Button>
            {onRegenerate && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-gray-400 hover:text-gray-600"
                onClick={onRegenerate}
              >
                <RefreshCw className="h-3.5 w-3.5 ml-1" />
                <span className="text-xs">إعادة</span>
              </Button>
            )}
          </div>
        )}

        {/* Timestamp */}
        <p
          className={cn(
            "text-[10px] text-gray-400 mt-1",
            isUser ? "text-left mr-2" : "mr-2"
          )}
        >
          {message.timestamp.toLocaleTimeString("ar-SA", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
}
