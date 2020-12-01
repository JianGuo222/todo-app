import React from "react";
import { mount } from "enzyme";
import TodoList from ".";
import "jest-styled-components";
import { initialTodos } from "./initTodos";

describe("<TodoList />", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(<TodoList defaultNewItemText="new item" />);
  });

  it("should render init 3 pending todo items", () => {
    expect(wrapper.find("#pending-list li")).toHaveLength(initialTodos.length);
    expect(wrapper.find("#completed-list li")).toHaveLength(0);
  });

  it("should add a new item when clicking on add button", () => {
    const mockId = 123;
    Date.now = jest.fn(() => mockId);
    wrapper.find("#add-button").simulate("click");
    expect(wrapper.find(`#pending-list li#item-${mockId}`)).toHaveLength(1);
  });

  it("should delete an item when clicking on delete button", () => {
    expect(wrapper.find("#pending-list li")).toHaveLength(initialTodos.length);
    wrapper
      .find("#pending-list li button[name='delete-button']")
      .first()
      .simulate("click");
    expect(wrapper.find("#pending-list li")).toHaveLength(
      initialTodos.length - 1
    );
  });

  it("should move an item from pending list to completed list when clicking on checkbox", () => {
    expect(wrapper.find("#completed-list li")).toHaveLength(0);
    wrapper
      .find("#pending-list li input[type='checkbox']")
      .first()
      .simulate("change", { target: { checked: true } });
    expect(wrapper.find("#completed-list li")).toHaveLength(1);
  });

  it("should sort by priority by default", () => {
    const sortedList = initialTodos.sort((a: TodoItem, b: TodoItem) =>
      a.priority >= b.priority ? 1 : -1
    );
    expect(wrapper.find("#pending-list li").first().prop("id")).toEqual(
      `item-${sortedList[0].id}`
    );
    expect(wrapper.find("#pending-list li").last().prop("id")).toEqual(
      `item-${sortedList[sortedList.length - 1].id}`
    );
  });

  it("should sort by text when clicking on Text radio button", () => {
    const sortedList = initialTodos.sort((a: TodoItem, b: TodoItem) =>
      a.text >= b.text ? 1 : -1
    );
    wrapper
      .find("#sort-text")
      .simulate("change", { target: { checked: true } });
    expect(wrapper.find("#pending-list li").first().prop("id")).toEqual(
      `item-${sortedList[0].id}`
    );
    expect(wrapper.find("#pending-list li").last().prop("id")).toEqual(
      `item-${sortedList[sortedList.length - 1].id}`
    );
  });

  it("should update priorty when editing the priority input", () => {
    wrapper
      .find("#pending-list li input[type='number']")
      .first()
      .simulate("change", { target: { value: 99999, blur: jest.fn() } });
    expect(wrapper.find("#pending-list li").last().prop("id")).toEqual(
      `item-${initialTodos[0].id}`
    );
  });

  it("should show correct totals of the pending/completed lists", () => {
    expect(wrapper.find("#pending-list h3").text()).toEqual(
      `Pending Items ${initialTodos.length}`
    );
    expect(wrapper.find("#completed-list h3").text()).toEqual(
      `Completed Items 0`
    );
    wrapper
      .find("#pending-list li input[type='checkbox']")
      .first()
      .simulate("change", { target: { checked: true } });
    expect(wrapper.find("#pending-list h3").text()).toEqual(
      `Pending Items ${initialTodos.length - 1}`
    );
    expect(wrapper.find("#completed-list h3").text()).toEqual(
      `Completed Items 1`
    );
  });
});
