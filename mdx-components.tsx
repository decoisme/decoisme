import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-black mb-6 mt-12 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4 mt-10 border-t border-black pt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-3 mt-8">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-bold tracking-tight text-black mb-2 mt-6">
        {children}
      </h4>
    ),
    
    // Paragraph
    p: ({ children }) => (
      <p className="text-base text-gray-600 leading-relaxed mb-6">
        {children}
      </p>
    ),
    
    // Lists
    ul: ({ children }) => (
      <ul className="list-none space-y-2 mb-6 ml-0">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-none space-y-2 mb-6 ml-0 counter-reset-list">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-base text-gray-600 leading-relaxed pl-6 relative before:content-['▪'] before:absolute before:left-0 before:text-black">
        {children}
      </li>
    ),
    
    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-black underline hover:no-underline transition-all duration-0"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    
    // Code
    code: ({ children, className }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="px-1.5 py-0.5 bg-gray-100 text-black text-sm font-mono border border-gray-300">
            {children}
          </code>
        );
      }
      return (
        <code className={className}>
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="p-4 bg-black text-white text-sm font-mono overflow-x-auto mb-6 border border-black">
        {children}
      </pre>
    ),
    
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-black pl-6 py-2 my-6 italic text-gray-600">
        {children}
      </blockquote>
    ),
    
    // Horizontal Rule
    hr: () => (
      <hr className="border-t border-black my-12" />
    ),
    
    // Images
    img: (props) => (
      <Image
        {...(props as ImageProps)}
        className="w-full h-auto border border-black my-8"
        width={1200}
        height={630}
        alt={props.alt || ''}
      />
    ),
    
    // Table
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full border border-black">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-black px-4 py-2 bg-black text-white text-left text-xs font-mono uppercase tracking-widest">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-black px-4 py-2 text-sm text-gray-600">
        {children}
      </td>
    ),
    
    ...components,
  };
}
