import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import NoteList from "../components/NoteList";
import HomePageAction from "../components/HomePageAction";
import PropTypes from "prop-types";
import { getActiveNotes } from "../utils/network-data";
import LocaleContext from "../Context/LocaleContext";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }
  return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class HomePage extends React.Component {
  static contextType = LocaleContext;

  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.defaultKeyword || "",
      isLoading: true,
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    if (this.props.keywordChange) {
      this.props.keywordChange(keyword);
    }
  }

  async componentDidMount() {
    const { data } = await getActiveNotes();

    this.setState(() => {
      return {
        notes: data,
        isLoading: false,
      };
    });
  }

  render() {
    const filteredNotes = this.state.notes.filter((note) => {
      return note.title.toLowerCase().includes(this.state.keyword.toLowerCase());
    });

    if (this.state.isLoading) {
      return <p>{this.context.locale === "id" ? "Memuat data..." : "Loading data..."}</p>;
    }

    return (
      <section>
        <h2>{this.context.locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
        <SearchInput keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        <NoteList notes={filteredNotes} />
        <HomePageAction />
      </section>
    );
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
