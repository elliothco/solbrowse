// Content Script → Background Port Messages
export interface ContentInitMsg {
  type: 'INIT_SCRAPE';
  tabId: number;
  url: string;
  title: string;
  html: string;
  timestamp: number;
}

export interface ContentDeltaMsg {
  type: 'DELTA_SCRAPE';
  tabId: number;
  url: string;
  html: string;
  changeType: 'mutation' | 'navigation' | 'manual';
  timestamp: number;
}

export type ContentPortMsg = ContentInitMsg | ContentDeltaMsg;

// UI (Sidebar/AskBar) ↔ Background Port Messages
export interface UiGetContentMsg {
  type: 'GET_CONTENT';
  tabIds: number[];
  requestId: string;
}

export interface UiContentResponseMsg {
  type: 'CONTENT_RESPONSE';
  requestId: string;
  pages: Array<{
    tabId: number;
    url: string;
    title: string;
    content: string;
    lastUpdated: number;
  }>;
}

export interface UiUserPromptMsg {
  type: 'USER_PROMPT';
  requestId: string;
  prompt: string;
  tabIds: number[];
  conversationId: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
  }>;
}

export interface UiLlmDeltaMsg {
  type: 'LLM_DELTA';
  requestId: string;
  delta: string;
}

export interface UiLlmDoneMsg {
  type: 'LLM_DONE';
  requestId: string;
  fullResponse: string;
}

export interface UiLlmErrorMsg {
  type: 'LLM_ERROR';
  requestId: string;
  error: string;
}

export interface UiListTabsMsg {
  type: 'LIST_TABS';
  requestId: string;
}

export interface UiTabsResponseMsg {
  type: 'TABS_RESPONSE';
  requestId: string;
  tabs: Array<{
    id: number;
    title: string;
    url: string;
    favIconUrl?: string;
  }>;
}

export type UiPortMsg = 
  | UiGetContentMsg 
  | UiContentResponseMsg 
  | UiUserPromptMsg 
  | UiLlmDeltaMsg 
  | UiLlmDoneMsg 
  | UiLlmErrorMsg
  | UiListTabsMsg
  | UiTabsResponseMsg;

// Content Script ↔ Iframe Communication Messages
export interface IframeActionMsg {
  type: 'IFRAME_ACTION';
  action: {
    type: 'ADD_USER_MESSAGE' | 'ADD_ASSISTANT_MESSAGE' | 'CLEAR_CONVERSATION' | 'UPDATE_CONVERSATION_ID' | 'UPDATE_STREAMING_MESSAGE';
    payload: any;
  };
}

export interface IframeCloseMsg {
  type: 'IFRAME_CLOSE';
}

export interface IframeGetCurrentTabMsg {
  type: 'IFRAME_GET_CURRENT_TAB';
}

export interface IframeCurrentTabResponseMsg {
  type: 'IFRAME_CURRENT_TAB_RESPONSE';
  tabId: number | null;
  url: string;
  title: string;
}

export type IframePortMsg = 
  | IframeActionMsg 
  | IframeCloseMsg 
  | IframeGetCurrentTabMsg 
  | IframeCurrentTabResponseMsg;

// Background Script Messages
export interface GetCurrentTabIdMsg {
  type: 'GET_CURRENT_TAB_ID';
}

export interface GetCurrentTabIdResponseMsg {
  tabId: number;
}

// Tab Snapshot Storage
export interface TabSnapshot {
  tabId: number;
  url: string;
  title: string;
  content: string;
  timestamp: number;
  changeType: 'init' | 'mutation' | 'navigation' | 'manual';
  // Basic versioning and metadata
  version: number;
  contentHash: string;
  lastAccessed: number;
  isCompressed: boolean;
  metadata: {
    domain: string;
    contentLength: number;
  };
}

// Port Names
export const PORT_NAMES = {
  CONTENT_PORT: 'CONTENT_PORT',
  UI_PORT: 'UI_PORT',
  IFRAME_PORT: 'IFRAME_PORT',
} as const;

// Add interface extension for Sol init if not defined
export interface SolInitMsg {
  type: 'sol-init';
  position?: string;
  conversationHistory?: any[];
  conversationId?: string | null;
  colorScheme?: 'light' | 'dark';
} 