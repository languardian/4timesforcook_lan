import React from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

/**
 * 搜尋頁面通用標籤
 * @param {string[]} tags
 * @param {string[]} selectedTags
 * @param {function} handleTagChange
 * @returns {JSX.Element}
 */
function TagSelector({ tags, selectedTags, handleTagChange }) {
  return (
    <>
      {tags.map(tag => (
        <CheckableTag
          key={tag}
          checked={selectedTags.includes(tag)}
          onChange={checked => handleTagChange(tag, checked)}
          style={{fontSize: '14px'}}
        >
          {tag}
        </CheckableTag>
      ))}
    </>
  );
}

export default TagSelector;