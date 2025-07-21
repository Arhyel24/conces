import { Member } from "../types";

export const saveMembers = (members: Member[]): void => {
  localStorage.setItem("CONCES_members", JSON.stringify(members));
};

export const loadMembers = (): Member[] => {
  const stored = localStorage.getItem("CONCES_members");
  return stored ? JSON.parse(stored) : [];
};

export const addMember = (member: Member): void => {
  const members = loadMembers();
  members.push(member);
  saveMembers(members);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
