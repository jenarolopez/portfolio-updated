import React from "react";

const TableContent = (props) => {
  return (
    <ul className="table-content">
      <li
        onClick={() => {
          props.setTab(1);
        }}
      >
        S.O.Search
      </li>
      <ul>
        <li
          onClick={() => {
            props.setTab(1);
          }}
        >
          Mobile
        </li>
        <li
          onClick={() => {
            props.setTab(1);
          }}
        >
          Website
        </li>
        <li
          onClick={() => {
            props.setTab(1);
          }}
        >
          Console
        </li>
      </ul>
      <li
        onClick={() => {
          props.setTab(2);
        }}
      >
        Wolca Website
      </li>
      <li
        onClick={() => {
          props.setTab(3);
        }}
      >
        Lampara
      </li>
      <ul>
        <li
          onClick={() => {
            props.setTab(3);
          }}
        >
          Mobile
        </li>
        <li
          onClick={() => {
            props.setTab(3);
          }}
        >
          Website
        </li>
        <li
          onClick={() => {
            props.setTab(3);
          }}
        >
          Desktop Accounting
        </li>
      </ul>
      <li
        onClick={() => {
          props.setTab(4);
        }}
      >
        UP Provident Fund Portal
      </li>
      <li
        onClick={() => {
          props.setTab(5);
        }}
      >
        AIF Group Accounting System
      </li>
      <li
        onClick={() => {
          props.setTab(6);
        }}
      >
        Other Recent Projects
      </li>
      <ul>
        <li
          onClick={() => {
            props.setTab(6);
          }}
        >
          Plagiarish and Grammar Checker Website (Our Thesis)
        </li>
        <li
          onClick={() => {
            props.setTab(6);
          }}
        >
          Face Recognition Mobile
        </li>
        <li
          onClick={() => {
            props.setTab(6);
          }}
        >
          NLEX Scheduling Management Desktop
        </li>
        <li
          onClick={() => {
            props.setTab(6);
          }}
        >
          TopNotch Petshop Website
        </li>
        <li
          onClick={() => {
            props.setTab(6);
          }}
        >
          Manga Website
        </li>
      </ul>
    </ul>
  );
};

export default TableContent;
