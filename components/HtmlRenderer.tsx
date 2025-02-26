// fully AI contributed component B)
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { parseDocument, ElementType } from 'htmlparser2';
import { ThemedText } from '@/components/ThemedText';

interface HtmlRendererProps {
  html: string;
}

export default class HtmlRenderer extends PureComponent<HtmlRendererProps> {
  ignoredTags = ['head', 'script', 'style'];

  // Render plain text as inline
  renderTextNode(textNode: any, index: number) {
    return <ThemedText key={index} type="default">{textNode.data}</ThemedText>;
  }

  renderLinkNode(element: any, index: number) {
    const href = element.attribs?.href;
    const children = element.children.map((c: any, i: number) => this.renderInlineNode(c, i));
    return (
      <ThemedText
        key={index}
        type="link"
        onPress={() => href && Linking.openURL(href)}
        style={styles.inline}
      >
        {children}
      </ThemedText>
    );
  }

  // Render inline tags (strong, em) without breaking the line
  renderInlineElement(element: any, index: number) {
    if (this.ignoredTags.includes(element.name)) {
      return null;
    }

    if (element.name === 'a') {
      return this.renderLinkNode(element, index);
    }

    const type = element.name === 'strong' ? 'defaultSemiBold' : element.name === 'em' ? 'subtitle' : 'default';
    const children = element.children.map((c: any, i: number) => this.renderInlineNode(c, i));
    return (
      <ThemedText key={index} type={type} style={styles.inline}>
        {children}
      </ThemedText>
    );
  }

  // Render nodes as inline content (used within paragraphs)
  renderInlineNode(node: any, index: number) {
    switch (node.type) {
      case ElementType.Text:
        return this.renderTextNode(node, index);
      case ElementType.Tag:
        return this.renderInlineElement(node, index);
      default:
        return null;
    }
  }

  // Render block-level elements (p, li)
  renderElement(element: any, index: number) {
    if (this.ignoredTags.includes(element.name)) {
      return null;
    }

    if (element.name === 'li') {
      const children = element.children.map((c: any, i: number) => this.renderInlineNode(c, i));
      return (
        <View key={index} style={styles.listItem}>
          <ThemedText type="default">• </ThemedText>
          <Text style={styles.inlineContainer}>{children}</Text>
        </View>
      );
    }

    if (element.name === 'p') {
      const children = element.children.map((c: any, i: number) => this.renderInlineNode(c, i));
      return (
        <View key={index} style={styles.paragraph}>
          <Text style={styles.inlineContainer}>{children}</Text>
        </View>
      );
    }

    // Fallback for other tags (shouldn’t hit this with your data)
    return this.renderInlineElement(element, index);
  }

  renderNode(node: any, index: number) {
    switch (node.type) {
      case ElementType.Text:
        return this.renderTextNode(node, index);
      case ElementType.Tag:
        return this.renderElement(node, index);
      default:
        return null;
    }
  }

  render() {
    const document = parseDocument(this.props.html);
    return <View>{document.children.map((c: any, i: number) => this.renderNode(c, i))}</View>;
  }
}

const styles = StyleSheet.create({
  paragraph: {
    marginVertical: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  inlineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inline: {
    flexShrink: 1, // Ensures elements don’t force a new line unnecessarily
  },
});
