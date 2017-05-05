class UserDatatable < AjaxDatatablesRails::Base
  def_delegators :@view, :params,:available_toggle,:image_tag,  :link_to, :user_path, :edit_user_path, :semantic_icon

  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= [
        'User.id',
        'User.name',
        'User.email',
    ]
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= [
        'User.id',
        'User.name',
        'User.email',
    ]
  end

  private

  def data
    records.map do |record|
      [
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
          record.id,
          record.name,
          record.email,
          record.room.name,
          record.ext,
          image_tag(record.avatar.url(:thumb)),
          link_to(semantic_icon('play'), user_path(record)),
          link_to(semantic_icon('edit'), edit_user_path(record)),
          link_to(semantic_icon('remove'),record, method: :delete)

      ]
    end
  end

  def get_raw_records
    # insert query here
    User.all
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
